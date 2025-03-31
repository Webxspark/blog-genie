class Routes {
    dashboard = "/dashboard";
    bases = {
        dashboard: this.dashboard,
        posts: this.dashboard+"/posts",
    }
    posts = {
        index: this.bases.posts,
        create: this.bases.posts + "/create",
    }
}
export const ROUTES = new Routes();
