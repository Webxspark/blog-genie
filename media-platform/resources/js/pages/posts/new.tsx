import React, {FormEvent, useEffect, useRef, useState} from 'react';
import AppLayout from "@/layouts/app-layout";
import {Head, router, usePage} from "@inertiajs/react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import type {BreadcrumbItem} from "@/types";
import {ROUTES} from "@/constants/routes";
import FroalaEditorComponent from "react-froala-wysiwyg";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/themes/royal.min.css';
import {Button} from "@/components/ui/button";
import {Loader, LoaderCircle, Send} from "lucide-react";
import {toast} from "sonner";
import {IPagePost} from "@/pages/posts/index";
import {VisitHelperOptions} from "@inertiajs/core"

interface IProps {
    post: IPagePost;

    [key: string]: unknown;
}

interface ValidationErrors {
    [key: string]: string;
}

const New = () => {
    const {post} = usePage<IProps>().props;
    const [initialContent, setInitialContent] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState<File | string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState(false);
    const isMounted = useRef(false);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'My Posts',
            href: ROUTES.posts.index,
        }, {
            title: post ? "Edit" : "New",
            href: ROUTES.posts.create,
        },
    ];

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            if (post) {
                setTitle(post.title);
                setDescription(post.description);
                setInitialContent(post.body);
                setContent(post.body);
                setThumbnail(post.thumbnail);
            }

            setTimeout(() => {
                setEditorLoaded(true);
            }, 500)
        }
    }, [post]);
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        data.append("body", content);
        if (thumbnail instanceof File) {
            data.append("thumbnail", thumbnail);
        }
        // Send the form data to the server
        const reqOptions: VisitHelperOptions = {
            onBefore: () => {
                setLoading(true);
                setErrors({});
            },
            onSuccess: () => {
                router.visit(ROUTES.posts.index);
            },
            onError: (validationErrors: ValidationErrors) => {
                toast.error("Oops! One or more field(s) are invalid.");
                console.log(errors || "Something went wrong! :(");
                setErrors(validationErrors);
            },
            onFinish: () => {
                setLoading(false);
            }
        }
        if (!post) {
            router.post(ROUTES.posts.index, data, reqOptions);
        } else {
            console.log(data)
            router.post(`${ROUTES.posts.index}/${post.id}`, {
                _method: 'PUT',
                title: title,
                description: description,
                body: content,
                ...(thumbnail instanceof File ? { thumbnail } : {})
            }, reqOptions);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'New Post'}/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    New Post
                </h1>
                <div className={'flex items-center justify-center'}>
                    <form
                        onSubmit={handleFormSubmit}
                        className={'space-y-4 w-full  border dark:border-gray-600 p-4 rounded-sm shadow-2xl border-gray-800'}>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'title'}>Title</Label>
                            <Input
                                id={'title'}
                                type={'text'}
                                value={title}
                                name={'title'}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={250}
                                placeholder={'Ex: My first post'}
                            />
                            {errors.title && <p className={'text-red-500 text-sm'}>{errors.title}</p>}
                        </div>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'description'}>Description</Label>
                            <Textarea
                                id={'description'}
                                value={description}
                                name={'description'}
                                onChange={(e) => setDescription(e.target.value)}
                                className={'resize-none'}
                                placeholder={'Ex: This is my first post'}
                            />
                            {errors.description && <p className={'text-red-500 text-sm'}>{errors.description}</p>}
                        </div>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'thumbnail'}>Thumbnail</Label>
                            {
                                post && <img
                                    src={`/images/${post.thumbnail}`}
                                    alt={post.title}
                                    className={'w-32 h-32 object-cover rounded-md'}
                                />
                            }
                            <Input
                                id={'thumbnail'}
                                type={'file'}
                                name={'thumbnail'}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setThumbnail(file);
                                }}
                                accept={"image/*"}
                            />
                            {errors.thumbnail && <p className={'text-red-500 text-sm'}>{errors.thumbnail}</p>}
                        </div>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'body'}>Content</Label>
                            {errors.body && <p className={'text-red-500 text-sm'}>{errors.body}</p>}
                            {
                                editorLoaded && <FroalaEditorComponent
                                    tag={'textarea'}
                                    model={initialContent}
                                    config={{
                                        theme: 'royal',
                                        editorClass: "prose max-w-none",
                                        attribution: false,
                                        documentReady: true,
                                        plugins: ['link', 'spellCheck', 'inlineStyle', 'charCounter'],
                                        toolbarButtons: [
                                            ['fullscreen', 'undo', 'redo'],
                                            ['bold', 'italic', 'underline'],
                                            ['fontFamily', 'fontSize'],
                                            ['paragraphFormat', 'align'],
                                            ['color', 'insertLink'],
                                            ['quote', 'insertHR'],
                                        ],
                                        events: {
                                            'contentChanged': function () {
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                // @ts-expect-error
                                                const newContent = this.html.get();
                                                setContent(newContent);
                                            },
                                        },
                                        model: content
                                    }}
                                /> || <div className={'flex justify-center'}>
                                    <LoaderCircle className={'animate-spin'}/>
                                </div>
                            }
                        </div>
                        <div className={'flex items-center justify-end'}>
                            <Button disabled={loading}>
                                {loading && <Loader className={'animate-spin'}/> || <Send/>} {post ? "Update" : "Publish"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default New;
