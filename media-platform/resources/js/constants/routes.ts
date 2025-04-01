class Routes {
    dashboard = "/dashboard";
    bases = {
        dashboard: this.dashboard,
        posts: this.dashboard + "/posts",
    }
    posts = {
        index: this.bases.posts,
        create: this.bases.posts + "/create",
    }
    home = "/"
    app = {
        post: this.home + "post",
        about: this.home + "about",
        contact: this.home + "contact",
    }
}

export const ROUTES = new Routes();
