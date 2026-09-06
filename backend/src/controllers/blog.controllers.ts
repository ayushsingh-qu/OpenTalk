import { Context } from "hono";
import { uploadToCloudinary } from "../lib/cloudinary";

// upload blog image to Cloudinary
const uploadBlogImage = async (c: Context) => {
  try {
    const body = await c.req.parseBody();
    const file = body["image"] || body["file"];

    if (!file || typeof file === "string") {
      return c.json(
        {
          success: false,
          message: "No image file provided. Please attach an image under 'image' or 'file'.",
        },
        400
      );
    }

    const cloudName = c.env?.CLOUDINARY_CLOUD_NAME;
    const apiKey = c.env?.CLOUDINARY_API_KEY;
    const apiSecret = c.env?.CLOUDINARY_API_SECRET;
    const uploadPreset = c.env?.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      return c.json(
        {
          success: false,
          message:
            "Cloudinary is not configured yet. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.",
        },
        500
      );
    }

    const uploadResult = await uploadToCloudinary(file, {
      cloudName,
      apiKey,
      apiSecret,
      uploadPreset,
    });

    return c.json(
      {
        success: true,
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        message: "Image uploaded successfully",
      },
      200
    );
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    return c.json(
      {
        success: false,
        message: err?.message || "Failed to upload image to Cloudinary",
      },
      500
    );
  }
};

//post the blog
const postBlog = async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const authorId = c.get("userid");

    type bodyData = {
      title: string;
      content: string;
      imageUrl?: string | null;
      authorId: string;
    };

    const data: bodyData = {
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl || null,
      authorId: authorId,
    };
    const blog = await prisma.blog.create({ data });

    return c.json(
      {
        message: "post is now published",
        data: blog,
      },
      200
    );
  } catch (err) {
    c.status(403);
    return c.json({
      message: "post is not uploaded",
      error: err,
    });
  }
};

//update the blog
const updateBlog = async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const id = c.req.param("id");

    type bodyData = {
      title: string;
      content: string;
      imageUrl?: string | null;
    };

    const data: bodyData = {
      title: body.title,
      content: body.content,
    };

    if (body.imageUrl !== undefined) {
      data.imageUrl = body.imageUrl;
    }

    const blog = await prisma.blog.update({
      where: {
        id: id,
      },
      data,
    });

    return c.json({
      message: "post is now updated",
      data: blog,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "post is not updated",
    });
  }
};

//delet the blog
const deleteBlog = async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const id = c.req.param("id");

    const blog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });

    return c.json({
      message: "post is now deleted",
      data: blog,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "post is not deleted",
    });
  }
};

//get my blog
const myblog = async (c: Context) => {
  const prisma = c.get("prisma");
  const authorId = c.get("userid");
  try {
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        email: true,
        createdAt: true,
        blogs: {
          select: {
            title: true,
            content: true,
            id: true,
            imageUrl: true,
          },
        },
      },
      where: {
        id: authorId,
      },
    });

    if (!user) {
      return c.json(
        {
          message: "User not found",
        },
        404
      );
    }

    user.blogs = user.blogs.reverse();

    return c.json(
      {
        message: "User is Authenticated",
        data: user,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Internal server error",
        error: error,
      },
      500
    );
  }
};

//get all blog
const blogs = async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const blog = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        imageUrl: true,
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (blog) {
      return c.json({
        blog,
      });
    } else {
      return c.json({
        message: "blog is not exist",
      });
    }
  } catch (err) {
    c.status(403);
    return c.json({
      message: "post is not uploaded",
    });
  }
};

//get a blog by id
const blog = async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const id = c.req.param("id");

    console.log(id);

    const blog = await prisma.blog.findUnique({
      select: {
        content: true,
        title: true,
        id: true,
        imageUrl: true,
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },

      where: {
        id: id,
      },
    });

    return c.json({
      blog: blog,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "post is not uploaded",
    });
  }
};

export { blogs, postBlog, updateBlog, deleteBlog, blog, myblog, uploadBlogImage };