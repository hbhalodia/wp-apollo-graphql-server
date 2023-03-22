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
		addArticle: async (_, { title, author, content, excerpt, slug, status, postType }, { dataSources }) => {
			return dataSources.WordPressPostAPI.addArticle({ title, author, content, excerpt, slug, status, postType });
		}
	}
}

export default resolvers;