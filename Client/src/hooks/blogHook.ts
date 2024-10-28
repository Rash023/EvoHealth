import { useEffect, useState } from "react"
import axios from "axios";
//import { BACKEND_URL } from "../config";
import { mockBlogs } from "../lib/Data/mock-blogs";

const BACKEND_URL="";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        // Fetch blog data from mock data instead of the backend
        const blogData = mockBlogs.find((blog) => blog.id === parseInt(id));
        setBlog(blogData);
        setLoading(false);

        // Commented-out axios logic:
        // axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        //     headers: {
        //         Authorization: localStorage.getItem("token")
        //     }
        // })
        //     .then(response => {
        //         setBlog(response.data.blog);
        //         setLoading(false);
        //     });
    }, [id]);

    return {
        loading,
        blog,
    };
};



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        // Fetch all blog data from mock data instead of the backend
        setBlogs(mockBlogs);
        setLoading(false);

        // Commented-out axios logic:
        // axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        //     headers: {
        //         Authorization: localStorage.getItem("token")
        //     }
        // })
        //     .then(response => {
        //         setBlogs(response.data.blogs);
        //         setLoading(false);
        //     })
    }, []);

    return {
        loading,
        blogs,
    };
};