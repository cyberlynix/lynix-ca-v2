import prisma from "@/libs/db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (id) {
        let article = await prisma.article.findFirst({
            where: {
                OR: [
                    {strId: id},
                    {id: id}
                ]
            }
        });

        if (!article) {
            return new Response(JSON.stringify({msg: "Article Not Found", success: false}), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return  new Response(JSON.stringify({msg: "Success", success: true, article: article}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        let articles = await prisma.article.findMany();
        
        return  new Response(JSON.stringify({msg: "Success", success: true, articles: articles}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export const dynamic = 'force-dynamic';