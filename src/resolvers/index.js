const resolvers = {
	Query: {
		articles: async (_, { pageSize = 5, postType = 'posts' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllArticles({ pageSize: pageSize, postType: postType });
		},
		article: async (_, { id, postType = 'posts' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getArticleById({ postId: id, postType: postType });
		},
		categories: async (_, { pageSize = 5 }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllCategories({ pageSize: pageSize });
		},
		category: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getCategoryById({ categoryId: id });
		},
		tags: async (_, { pageSize = 5 }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllTags({ pageSize: pageSize });
		},
		tag: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getTagById({ tagId: id });
		},
		users: async (_, { pageSize = 5 }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllUsers({ pageSize: pageSize });
		},
		user: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getUserById({ userId: id });
		},
		attachments: async (_, { pageSize = 5 }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllAttachments({ pageSize: pageSize });
		},
		attachment: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAttachmentById({ attachmentId: id });
		},
	},
}

export default resolvers;