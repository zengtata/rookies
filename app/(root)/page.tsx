import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  const result = await db.select().from(users);

  console.log(JSON.stringify(result, null, 2));

  return (
    <>
      <BookOverview {...sampleBooks[0]} />

      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
