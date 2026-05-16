
import type { MetadataRoute } from "next";

const baseUrl = "https://aristaproduction.com";

export default function sitemap(): MetadataRoute.Sitemap {

  return [

    {

      url: `${baseUrl}/`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 1,

    },

    {

      url: `${baseUrl}/product`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

  ];

}

