import AppLayout from "@/layouts/app-layout";
import type {BreadcrumbItem} from "@/types";
import {ROUTES} from "@/constants/routes";
import {Head, router, usePage} from "@inertiajs/react";
import {Button} from "@/components/ui/button";
import {Edit, Eye, PlusSquare, Trash2} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@/components/ui/table";
import dayjs from "dayjs";
import {Modal} from "antd";
import {toast} from "sonner";
import '@ant-design/v5-patch-for-react-19';
import {useEffect} from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: ROUTES.dashboard,
    },
    {
        title: 'Posts',
        href: ROUTES.posts.index,
    },
];

export interface IPagePost {
    id: number;
    title: string;
    description: string;
    slug: string;
    body: string;
    views: number;
    created_at: string;
    author: {
        id: number;
        name: string;
        email: string;
    },
    thumbnail: string;
}

interface IPageProps {
    posts: IPagePost[];
    flash?: {
        success: string;
        error: string;
    };

    [key: string]: unknown;
}


const Posts = () => {
    const {posts, flash} = usePage<IPageProps>().props;
    console.log(posts);

    useEffect(() => {
        // Check for flash messages and display them as toasts
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash?.error);
        }
    }, [flash]);

    const handleDeleteRequest = (id: number) => {
        Modal.confirm({
            title: "Are you sure to delete this post?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => {
                router.delete(`${ROUTES.posts.index}/${id}`, {
                    onSuccess: () => {
                        router.reload();
                        // toast.success("Post deleted successfully.");
                    },
                    onError: (error) => {
                        // toast.error("Failed to delete post.");
                        console.log(error);
                    }
                })
            }
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>My Posts</title>
                <meta name="description" content="My Posts"/>
            </Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className={'flex items-center justify-between'}>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        My Posts
                    </h1>
                    <Button onClick={() => router.visit(ROUTES.posts.create)}>
                        <PlusSquare/> New Post
                    </Button>
                </div>
                <Table>
                    <TableRow>
                        <TableHead className={'w-20'}>S.No</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Uploaded On</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    <TableBody>
                        {
                            posts.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1})</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell className={'flex h-full items-center gap-2'}><Eye
                                        className={'size-4'}/> {post.views}</TableCell>
                                    <TableCell>{dayjs(post.created_at).format('DD MMM YYYY (hh:mm A)')}</TableCell>
                                    <TableCell className={'flex items-center gap-2'}>
                                        <Button onClick={() => router.visit(`${ROUTES.posts.index}/${post.id}/edit`)} size={null} variant={'ghost'} className={'px-2 p-1'}>
                                            <Edit/>
                                        </Button>
                                        <Button onClick={() => handleDeleteRequest(post.id)} size={null}
                                                variant={'destructive'} className={'p-1 px-2'}>
                                            <Trash2/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

        </AppLayout>
    );
};

export default Posts;
