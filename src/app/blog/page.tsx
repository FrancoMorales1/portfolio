import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getSortedPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Franco Morales",
  description: "Registro de publicaciones de Franco Morales.",
};

function formatDate(date: string) {
  if (!date) return "";
  return new Date(date + "T00:00:00").toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getSortedPostsMeta();

  return (
    <section className="w-full min-h-screen py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-12 text-center tracking-tight">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">Todavía no hay publicaciones.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="transition-all hover:shadow-md hover:border-primary/40">
                  <CardHeader>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    {post.date && (
                      <CardDescription>{formatDate(post.date)}</CardDescription>
                    )}
                  </CardHeader>
                  {post.excerpt && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
