const resolvers = {
	Query: {
		articles: async (_, { pageSize = 5, postType = 'posts' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllArticles({ pageSize: pageSize, postType: postType });
		},
		article: async (_, { id, postType = 'posts' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getArticleById({ postId: id, postType: postType });
		},
		taxonomies: async (_, { pageSize = 5, taxonomy = 'categories' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllTaxonomies({ pageSize: pageSize, taxonomy: taxonomy });
		},
		taxonomy: async (_, { id, taxonomy = 'categories' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getTaxonomyById({ taxonomyId: id, taxonomy: taxonomy });
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
	Mutation: {
		addArticle: async (_, { title, content, excerpt, slug, status, type }, { dataSources }) => {
			return dataSources.WordPressPostAPI.addPostArticle({ title, content, excerpt, slug, status, type });
		}
	}
}

export default resolvers;