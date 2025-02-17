"use client";

import React, { useMemo, useCallback } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Edge,
    Node,
} from "reactflow";
import "reactflow/dist/style.css";

interface Milestone {
    milestone: {
        id: string;
        name: string;
        description: string;
        resources: string;
    };
    step_order: number;
}

interface MilestoneFlowProps {
    milestones: Milestone[];
    currentIndex: number;
    onSelectMilestone: (index: number) => void;
}

export function MilestoneFlow({
                                  milestones,
                                  currentIndex,
                                  onSelectMilestone,
                              }: MilestoneFlowProps) {
    // 1. Convert milestones to React Flow nodes
    //    For a simple "diagonal" layout, increment x,y for each milestone
    const nodes = useMemo(() => {
        return milestones.map((m, i) => ({
            id: m.milestone.id,
            position: { x: i * 150, y: i * 100 },
            data: { label: m.milestone.name },
            style: {
                background: i === currentIndex ? "#2973B2" : "#9ACBD0",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 8,
                fontWeight: "bold",
            },
        }));
    }, [milestones, currentIndex]);

    // 2. Create edges between consecutive milestones
    //    We'll use 'step' edges for angled lines
    const edges = useMemo(() => {
        const newEdges: Edge[] = [];
        for (let i = 0; i < milestones.length - 1; i++) {
            newEdges.push({
                id: `edge-${milestones[i].milestone.id}-${milestones[i + 1].milestone.id}`,
                source: milestones[i].milestone.id,
                target: milestones[i + 1].milestone.id,
                type: "step", // angled path
                animated: false,
                style: { stroke: "#F2EFE7", strokeWidth: 2 },
            });
        }
        return newEdges;
    }, [milestones]);

    // 3. Handle node clicks
    const handleNodeClick = useCallback(
        (_: any, node: Node) => {
            const index = milestones.findIndex((m) => m.milestone.id === node.id);
            if (index !== -1) {
                onSelectMilestone(index);
            }
        },
        [milestones, onSelectMilestone]
    );

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={handleNodeClick}
                fitView
                fitViewOptions={{ padding: 0.2 }}
            >
                <Controls />
                <Background variant={"dots" as any} gap={12} size={1} />
                {/* Optional: <MiniMap /> if you want a minimap preview */}
            </ReactFlow>
        </div>
    );
}
