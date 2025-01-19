export default [
   
    // Blog Content Generator
    {
      name: 'Blog Content Generator',
      desc: 'An AI tool that generates high-quality blog content based on the provided title and key points',
      category: 'Blog',
      icon: 'https://cdn-icons-png.flaticon.com/128/921/921347.png',
      aiPrompt:
          'Generate a detailed and well-structured blog post based on the provided title and key points. Ensure the content is engaging, SEO-friendly, and free of plagiarism.',
      slug: 'generate-blog-content',
      form: [
          {
              label: 'Enter blog title',
              field: 'input',
              name: 'title',
              required: true,
          },
          {
              label: 'Enter key points',
              field: 'textarea',
              name: 'keyPoints',
              required: true,
          },
      ],
  },

  // Instagram Hashtag Generator
  {
      name: 'Instagram Hashtag Generator',
      desc: 'An AI tool that generates relevant and trending hashtags for Instagram posts',
      category: 'Social Media',
      icon: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png',
      aiPrompt:
          'Generate 10-15 relevant and trending Instagram hashtags based on the provided post description. Ensure the hashtags are engaging and suited for maximum reach.',
      slug: 'generate-instagram-hashtags',
      form: [
          {
              label: 'Enter post description',
              field: 'textarea',
              name: 'description',
              required: true,
          },
          {
              label: 'Enter related keywords (optional)',
              field: 'input',
              name: 'keywords',
          },
      ],
  },
    // Blog Topic Ideas
    {
      name: 'Blog Topic Ideas',
      desc: 'An AI tool that generates blog topic ideas based on the given niche',
      category: 'Blog',
      icon: 'https://cdn-icons-png.flaticon.com/128/16529/16529902.png',
      aiPrompt:
        'Provide 10 creative blog topic ideas without description in bullet points based on the provided blog niche.',
      slug: 'generate-blog-topic-ideas',
      form: [
        {
          label: 'Enter your blog niche',
          field: 'input',
          name: 'niche',
          required: true,
        },
      ],
    },
    // YouTube SEO Title Generator
    {
      name: 'YouTube SEO Title',
      desc: 'An AI tool that generates SEO-friendly YouTube titles',
      category: 'YouTube',
      icon: 'https://cdn-icons-png.flaticon.com/128/15707/15707814.png',
      aiPrompt:
        'Generate 5 SEO-friendly YouTube video titles based on the provided video description and keywords.',
      slug: 'generate-youtube-seo-title',
      form: [
        {
          label: 'Enter video description',
          field: 'textarea',
          name: 'description',
          required: true,
        },
        {
          label: 'Enter relevant keywords',
          field: 'input',
          name: 'keywords',
        },
      ],
    },
    // YouTube Description Generator
    {
      name: 'YouTube Description',
      desc: 'An AI tool that generates optimized YouTube video descriptions',
      category: 'YouTube',
      icon: 'https://cdn-icons-png.flaticon.com/128/4412/4412548.png',
      aiPrompt:
        'Generate a detailed YouTube video description based on the provided video title and key points.',
      slug: 'generate-youtube-description',
      form: [
        {
          label: 'Enter video title',
          field: 'input',
          name: 'title',
          required: true,
        },
        {
          label: 'Enter key points',
          field: 'textarea',
          name: 'keyPoints',
        },
      ],
    },
   
    // YouTube Tags Generator
    {
      name: 'YouTube Tags',
      desc: 'An AI tool that generates relevant tags for YouTube videos',
      category: 'YouTube',
      icon: 'https://cdn-icons-png.flaticon.com/128/7346/7346398.png',
      aiPrompt:
        'Generate a list of 10-15 relevant tags for the given YouTube video title and description.',
      slug: 'generate-youtube-tags',
      form: [
        {
          label: 'Enter video title',
          field: 'input',
          name: 'title',
          required: true,
        },
        {
          label: 'Enter video description',
          field: 'textarea',
          name: 'description',
        },
      ],
    },
     // Rewrite Article (Plagiarism Free) Generator
  {
    name: 'Rewrite Article (Plagiarism Free)',
    desc: 'An AI tool that rewrites articles to make them plagiarism-free and unique',
    category: 'Writing',
    icon: 'https://cdn-icons-png.flaticon.com/128/11053/11053823.png',
    aiPrompt:
      'Rewrite the given article in a way that ensures it is plagiarism-free while preserving the original meaning and context. The output should be unique, engaging, and free of grammatical errors. Provide the result in Rich Text Editor format.',
    slug: 'rewrite-article-plagiarism-free',
    form: [
      {
        label: 'Enter article to rewrite',
        field: 'textarea',
        name: 'article',
        required: true,
      },
    ],
  },
    // Fix Improper Text
    {
      name: 'Fix Improper Text',
      desc: 'An AI tool that corrects grammar, punctuation, and sentence structure',
      category: 'Writing',
      icon: 'https://cdn-icons-png.flaticon.com/128/1903/1903606.png',
      aiPrompt:
        'Correct the grammar, punctuation, and sentence structure of the given text. Ensure the result is fluent and professional. Provide the output in Rich Text Editor format.',
      slug: 'fix-improper-text',
      form: [
        {
          label: 'Enter text to fix',
          field: 'textarea',
          name: 'text',
          required: true,
        },
      ],
    },
     // Emoji to Text
  {
    name: 'Emoji to Text',
    desc: 'An AI tool that converts emojis into meaningful text descriptions',
    category: 'Utility',
    icon: 'https://cdn-icons-png.flaticon.com/128/14468/14468226.png',
    aiPrompt:
      'Convert the given emojis into meaningful text descriptions. Ensure the output is clear and conveys the intended emotion or message.',
    slug: 'emoji-to-text',
    form: [
      {
        label: 'Enter emojis',
        field: 'input',
        name: 'emojis',
        required: true,
      },
    ],
  },
  // Instagram Post Generator
  {
    name: 'Instagram Post Generator',
    desc: 'An AI tool that generates engaging captions for Instagram posts',
    category: 'Social Media',
    icon: 'https://cdn-icons-png.flaticon.com/128/3621/3621435.png',
    aiPrompt:
      'Generate 5 creative and engaging captions for an Instagram post based on the provided description and hashtags. Ensure the tone is fun, relatable, and optimized for social media engagement.',
    slug: 'generate-instagram-post',
    form: [
      {
        label: 'Enter post description',
        field: 'textarea',
        name: 'description',
        required: true,
      },
      {
        label: 'Enter hashtags',
        field: 'input',
        name: 'hashtags',
      },
    ],
  },
  ];
  