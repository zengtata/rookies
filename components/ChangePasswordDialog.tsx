"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({
                                       open,
                                       onOpenChange,
                                     }: ChangePasswordDialogProps) {

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast({ title: "Error", description: "New passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Success",
          description: "Password changed successfully.",
        });
        reset();
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to change password.",
        });
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast({
        title: "Error",
        description: "Server error during password change.",
      });
    }
    setLoading(false);
  };

  const onError = (errors: any) => {
    if (errors.newPassword && errors.newPassword.message === "Password must contain at least one uppercase and one lowercase letter.") {
      toast({ title: "Error", description: "Password must contain at least one uppercase and one lowercase letter." });
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your old password and choose a new password.
          </DialogDescription>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="oldPassword">Old Password</Label>
              <div className="relative">
                <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    {...register("oldPassword", {
                      required: "Old password is required",
                    })}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      validate: (value) =>
                          (/[a-z]/.test(value) && /[A-Z]/.test(value)) ||
                          "Password must contain at least one uppercase and one lowercase letter.",
                    })}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            </div>
            <div>
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmNewPassword", {
                      required: "Please confirm your new password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                >
                  {showConfirmPassword ? (
                      <EyeOff size={18} />
                  ) : (
                      <Eye size={18} />
                  )}
                </button>
              </div>

            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading} className="text-white">
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
}
