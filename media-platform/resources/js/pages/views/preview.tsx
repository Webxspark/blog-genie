import {Head, usePage} from "@inertiajs/react";
import {IPagePost} from "@/pages/posts";
import {SharedData} from "@/types";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import {ROUTES} from "@/constants/routes";
import dayjs from "dayjs";

const appName = import.meta.env.VITE_APP_NAME;
const PostPreview = () => {
    const {post} = usePage<{ post: IPagePost } & SharedData>().props;
    console.log(post);
    return (
        <AppHeaderLayout breadcrumbs={[
            {
                title: "Home",
                href: ROUTES.home,
            },
            {
                title: "Post",
                href: "/",
            }
        ]}>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description}/>
                <meta property="og:title" content={post.title}/>
                <meta property="og:description" content={post.description}/>
                <meta property="og:image" content={`/images/${post.thumbnail}`}/>
                <meta property="og:url" content={location.href}/>
                <meta property="og:type" content="article"/>
                <meta property="og:site_name" content={appName}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="article:published_time" content={post.created_at}/>
                <meta property="article:modified_time" content={post.updated_at}/>
                <meta property="article:author" content={post.user.name}/>
                <meta property="article:publisher" content={post.user.name}/>
                <meta property="article:published" content={post.created_at}/>
                <meta property="article:modified" content={post.updated_at}/>
            </Head>
            <div>
                <div
                    className={'pt-8 pb-16 lg:pt-16 lg:pb-24  antialiased'}
                >
                    <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                        <article
                            className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                            <header className="mb-4 lg:mb-6 not-format">
                                <address className="flex items-center mb-6 not-italic">
                                    <div
                                        className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                        <img className="mr-4 w-16 h-16 rounded-full"
                                             src="https://github.com/shadcn.png"
                                             alt={post.user.name}/>
                                        <div>
                                            <a href="#" rel="author"
                                               className="text-xl font-bold text-gray-900 dark:text-white">{post.user.name}</a>
                                            <p className="text-base text-gray-500 dark:text-gray-400">
                                                <time dateTime={dayjs(post.created_at).format('YYYY-MM-DD hh:mm:ss A')}
                                                      title={dayjs(post.created_at).format('MMMM DD, YYYY')}>{dayjs(post.created_at).format('MMM. DD, YYYY')}</time>
                                            </p>
                                        </div>
                                    </div>
                                </address>
                                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post.title}</h1>
                            </header>
                            <p className="lead">{post.description}</p>
                            <figure className={'my-4'}>
                                <img
                                    src={`/images/${post.thumbnail}`}
                                    className="w-full h-96 object-cover rounded-lg"
                                    alt={post.title}
                                />
                            </figure>
                            <div
                                className={'prose dark:prose-invert'}
                                dangerouslySetInnerHTML={{__html: post.body!}}
                            />
                        </article>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
};

export default PostPreview;
