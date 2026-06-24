import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, User, Calendar, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface BlogPostContent {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: number;
  gradient: string;
  body: string;
}

const POSTS: Record<string, BlogPostContent> = {
  "rise-of-artisan-bakeries": {
    slug: "rise-of-artisan-bakeries",
    title: "The rise of artisan bakeries: why local is winning",
    excerpt:
      "From sourdough to small-batch macarons, neighbourhood bakeries are reclaiming the high street.",
    category: "Bakery Spotlight",
    author: "Leila Moussaoui",
    authorRole: "Food Editor",
    date: "2026-06-18",
    readTime: 6,
    gradient: "from-amber-400 to-orange-500",
    body: `
For decades, the supermarket ruled the bakery aisle. Pre-packaged, preservative-laden, and cheap — they seemed unbeatable. But something shifted. In the last five years, neighbourhood bakeries across Morocco, France, and beyond have not just survived — they have thrived.

## The quality gap is impossible to ignore

Walk into any artisan bakery at 7am and you'll understand immediately. The smell alone — warm dough, caramelising sugar, toasting almonds — tells you something different is happening here. The croissants are layered, not puffed with gas. The sourdough has a crust that shatters rather than compresses.

Customers who grew up with industrial bread are rediscovering what bread was always supposed to taste like. Once you experience that, going back is psychologically very hard.

## The pandemic accelerated everything

COVID-19 was devastating for many businesses, but it forced a rethinking of how we consume food. People baked at home for the first time, developed a sudden literacy about fermentation, flour types, and technique — and in doing so, raised their standards permanently.

Local bakeries, already trusted because of their community roots, became essential services. Customers formed habits that outlasted lockdowns.

## What makes them win?

We spoke to five bakery owners across our platform. Three themes emerged consistently:

**Identity and story.** Every artisan bakery has a person behind it. A grandmother's recipe, a detour from a corporate career, an obsession with a particular region's pastry tradition. That story is a product differentiator that no supermarket can replicate.

**Freshness as a business model.** When you bake in small batches every morning, you don't have surplus — you have scarcity. Scarcity creates urgency. Urgency creates loyalty.

**Community embeddedness.** The best local bakeries are neighbourhood fixtures. They know their regulars by name, stock local butter, partner with nearby cafés. They are part of the community's identity in a way that a supermarket chain never can be.

## What comes next?

Digital discovery is the next frontier. Platforms like Sweet Treats are giving artisan bakers a reach that used to require expensive marketing budgets. A baker in a quiet residential neighbourhood can now appear in search results for the whole city.

The quality was always there. The audience is finally catching up.
    `.trim(),
  },
  "vegan-baking-guide": {
    slug: "vegan-baking-guide",
    title: "Vegan baking decoded: what our bakers want you to know",
    excerpt:
      "Plant-based doesn't mean tasteless. Three of our top vegan bakeries share the secrets.",
    category: "Baking Tips",
    author: "Omar Benali",
    authorRole: "Contributing Writer",
    date: "2026-06-04",
    readTime: 7,
    gradient: "from-green-400 to-emerald-500",
    body: `
Vegan baking has a reputation problem. Ask most people and they'll describe dense, gummy cakes that taste of compromise. That reputation is outdated and, frankly, unfair to the bakers who have spent years solving what are genuinely interesting technical problems.

## The science of substitution

The challenge in vegan baking isn't finding replacements — it's understanding *what each ingredient actually does* and finding something that replicates that specific function.

**Eggs** do three things: bind (holding the cake together), leaven (trapping air), and emulsify (combining fat and water). No single substitute does all three. The best vegan bakers layer substitutes: flax eggs for binding, aquafaba for leavening, and sunflower oil for emulsification.

**Butter** is primarily fat and water, emulsified. Coconut oil replicates the fat perfectly at high temperatures, but it doesn't carry flavour the same way. That's why vegan croissants often add a small amount of tahini or a high-quality nut butter — for the nutty, rounded flavour that European butter provides.

**Milk** is the easiest substitution. Oat milk (for its neutral flavour and foam-ability) has become the near-universal choice among the vegan bakers we spoke to. For cream-based recipes, cashew cream is the gold standard.

## Three techniques that make the difference

**Don't skip the resting time.** Vegan batters often need longer resting periods to allow starches to hydrate properly. A cake batter left to rest for 20–30 minutes will bake more evenly and have a tighter crumb.

**Watch your ratios of leavening agents.** Without eggs to create structure, baking soda and baking powder do more work. Too much and you get a bitter, soapy taste. Too little and you get a brick. Precision matters more in vegan baking.

**Temperature control is critical.** Coconut oil behaves very differently at 18°C versus 25°C. Many novice vegan bakers don't account for ambient temperature when working with coconut-based fats.

## The results speak for themselves

Two of our platform's highest-rated bakeries are exclusively vegan. Their reviews consistently mention that customers only realise they're vegan after being told — which is, perhaps, the highest compliment.

The best vegan baking doesn't advertise its restrictions. It showcases what it achieves.
    `.trim(),
  },
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = POSTS[params.slug];
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Sweet Treats Blog`,
    description: post.excerpt,
  };
}

function renderBody(body: string) {
  return body.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("**") && block.endsWith("**")) {
      const content = block.slice(2, -2);
      return (
        <p key={i} className="font-semibold text-gray-900 mb-2">
          {content}
        </p>
      );
    }
    const parts = block.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <p key={i} className="text-gray-700 leading-relaxed mb-4">
        {parts}
      </p>
    );
  });
}

const RELATED = Object.values(POSTS).slice(0, 2);

export default function BlogPostPage({ params }: Props) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Cover */}
      <div className={`h-64 md:h-80 bg-gradient-to-br ${post.gradient} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative">
          <Badge className="w-fit mb-3 bg-white/20 hover:bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <Link href="/blog" className="flex items-center gap-1.5 hover:text-amber-700">
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {post.author} · {post.authorRole}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime} min read
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-amber-400 pl-4">
            {post.excerpt}
          </p>
          <div className="prose-custom">
            {renderBody(post.body)}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-10 pt-8 border-t">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary">{post.category}</Badge>
            <Badge variant="secondary">Sweet Treats</Badge>
            <Badge variant="secondary">Local Bakeries</Badge>
          </div>
        </div>

        {/* Related articles */}
        <div className="max-w-2xl mx-auto mt-14">
          <h2 className="text-xl font-bold mb-6">More from the blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RELATED.filter((p) => p.slug !== post.slug).slice(0, 2).map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                <div className="rounded-2xl overflow-hidden border hover:shadow-md transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${related.gradient}`} />
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">{related.category}</Badge>
                    <h3 className="font-semibold text-sm leading-tight group-hover:text-amber-700 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{related.readTime} min read</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                View all articles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
