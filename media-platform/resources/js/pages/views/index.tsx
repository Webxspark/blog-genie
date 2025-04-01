import AppHeaderLayout from "@/layouts/app/app-header-layout";
import {Head, Link, router, usePage} from "@inertiajs/react";
import {IPageProps} from "@/pages/posts";
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {ROUTES} from "@/constants/routes";
import {UserCircle} from "lucide-react";

const BlogApp = () => {
    const {posts} = usePage<IPageProps>().props;
    console.log(posts);
    return (
        <AppHeaderLayout>
            <Head title={'Home'}/>
            <div className="py-7 lg:px-0">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.length > 0 && posts.map((post) => (
                        <Card>
                            <CardContent>
                                <div key={post.id}
                                     className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                                    <img src={`/images/${post.thumbnail}`} alt={post.title}
                                         className="w-full h-full object-cover cursor-pointer"
                                         onClick={() => router.visit(`${ROUTES.app.post}/${post.slug}`)}
                                    />
                                </div>
                                <div className={'pt-3'}>
                                    <div className={'flex items-center gap-2 my-1'}><UserCircle
                                        className={'size-5'}/> {post.user.name}</div>
                                    <Link href={`${ROUTES.app.post}/${post.slug}`}>
                                        <CardTitle className={'py-1.5 leading-5'}>{post.title}</CardTitle>
                                        <CardDescription>{post.description.slice(0, 100)}...</CardDescription>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {posts.length === 0 && (
                    <div className={'flex items-center h-[40dvh] justify-center'}>
                        <h1 className={'text-2xl font-bold text-gray-900 dark:text-gray-100'}>No Posts Found</h1>
                    </div>
                )}
            </div>
        </AppHeaderLayout>
    );
};

export default BlogApp;
