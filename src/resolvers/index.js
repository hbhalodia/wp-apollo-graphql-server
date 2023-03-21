const resolvers = {
	Query: {
		posts: async (_, { pageSize = 5 }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllPosts({ pageSize: pageSize });
		},
		post: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getPostById({ postId: id });
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