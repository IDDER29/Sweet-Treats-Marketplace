import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog — Sweet Treats Marketplace",
  description:
    "Bakery spotlights, seasonal recipes, baking tips, and stories from the local food community.",
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  gradient: string;
  featured?: boolean;
}

const POSTS: BlogPost[] = [
  {
    slug: "rise-of-artisan-bakeries",
    title: "The rise of artisan bakeries: why local is winning",
    excerpt:
      "From sourdough to small-batch macarons, neighbourhood bakeries are reclaiming the high street. We spoke to five bakers about what drives the movement.",
    category: "Bakery Spotlight",
    author: "Leila Moussaoui",
    date: "2026-06-18",
    readTime: 6,
    gradient: "from-amber-400 to-orange-500",
    featured: true,
  },
  {
    slug: "mothers-day-cake-ideas",
    title: "10 show-stopping cakes to order for Mother's Day",
    excerpt:
      "Skip the supermarket and order something extraordinary. Our editors picked the most stunning cakes available from local bakeries right now.",
    category: "Gift Guide",
    author: "Amira Khoury",
    date: "2026-06-10",
    readTime: 4,
    gradient: "from-rose-400 to-pink-500",
  },
  {
    slug: "vegan-baking-guide",
    title: "Vegan baking decoded: what our bakers want you to know",
    excerpt:
      "Plant-based doesn't mean tasteless. Three of our top vegan bakeries share the ingredients and techniques that make their treats extraordinary.",
    category: "Baking Tips",
    author: "Omar Benali",
    date: "2026-06-04",
    readTime: 7,
    gradient: "from-green-400 to-emerald-500",
  },
  {
    slug: "ramadan-sweets-guide",
    title: "A guide to traditional Ramadan sweets from local bakeries",
    excerpt:
      "Chebakia, sellou, briouats, and more — our guide to finding authentic Ramadan treats from bakeries who have perfected generations-old recipes.",
    category: "Seasonal",
    author: "Fatima Zahra",
    date: "2026-05-28",
    readTime: 5,
    gradient: "from-violet-400 to-purple-500",
  },
  {
    slug: "how-we-vet-bakeries",
    title: "How we vet every bakery before they join Sweet Treats",
    excerpt:
      "Not every bakery makes the cut. Here's the full process we go through — from the first application to the in-person tasting session.",
    category: "Behind the Scenes",
    author: "Sweet Treats Team",
    date: "2026-05-20",
    readTime: 4,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    slug: "gluten-free-treats",
    title: "Gluten-free treats that actually taste incredible",
    excerpt:
      "Gluten-free used to mean cardboard-dry and flavourless. Not anymore. Meet the bakers rewriting the rules.",
    category: "Dietary Guide",
    author: "Sara Benkirane",
    date: "2026-05-12",
    readTime: 5,
    gradient: "from-yellow-400 to-amber-500",
  },
];

const CATEGORIES = ["All", "Bakery Spotlight", "Gift Guide", "Baking Tips", "Seasonal", "Behind the Scenes", "Dietary Guide"];

function PostCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className={`rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow h-full flex flex-col`}>
        {/* Cover */}
        <div className={`${large ? "h-64" : "h-44"} bg-gradient-to-br ${post.gradient} relative flex items-end`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          <div className="relative p-4">
            <Badge className="bg-white/20 hover:bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm">
              {post.category}
            </Badge>
          </div>
        </div>
        {/* Content */}
        <div className={`flex-1 flex flex-col p-5 ${large ? "p-6" : ""}`}>
          <h2 className={`font-bold leading-tight mb-3 group-hover:text-amber-700 transition-colors ${large ? "text-2xl" : "text-base"}`}>
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-5 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-sm px-4 py-1">
            Stories, tips & recipes
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            The Sweet Treats Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Bakery spotlights, baking guides, seasonal inspiration, and behind-the-scenes
            stories from the Sweet Treats community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={cat === "All" ? "default" : "secondary"}
              className={`cursor-pointer text-sm px-3 py-1 ${
                cat === "All"
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "hover:bg-amber-100 hover:text-amber-800"
              }`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {cat}
            </Badge>
          ))}
        </div>

        {/* Featured post */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Featured</h2>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
              Editor&apos;s pick
            </Badge>
          </div>
          <PostCard post={featured} large />
        </div>

        {/* Grid */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-5">Latest articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold mb-2">Never miss a sweet story</h3>
          <p className="text-amber-100 mb-6">
            Weekly baking inspiration, new bakery spotlights, and exclusive deals — straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold whitespace-nowrap gap-1">
              Subscribe <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-amber-200 text-xs mt-3">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </div>
  );
}
