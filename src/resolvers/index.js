const resolvers = {
	Query: {
		articles: async (_, { pageSize = 5, postType = 'posts', category = '', page = 1 }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllArticles({ pageSize: pageSize, postType: postType, category: category, page: page });
		},
		article: async (_, { id, postType = 'posts' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getArticleById({ postId: id, postType: postType });
		},
		taxonomies: async (_, { pageSize = 5, taxonomy = 'categories', slug = '' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllTaxonomies({ pageSize: pageSize, taxonomy: taxonomy, slug: slug });
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
		settings: async( _, __, { dataSources }) => {
			return dataSources.WordPressPostAPI.getSettings();
		},
		menus: async (_, __, { dataSources }) => {
			return dataSources.WordPressPostAPI.getMenus();
		},
		menu: async (_, { slug }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getMenuItemsSlug({ slug: slug });
		}
	},
	Mutation: {
		addArticle: async (_, { title, author, content, excerpt, slug, status, postType }, { dataSources }) => {
			return dataSources.WordPressPostAPI.addArticle({ title, author, content, excerpt, slug, status, postType });
		},
		addTaxonomy: async (_, { description, name, slug, taxonomy, parent }, { dataSources }) => {
			return dataSources.WordPressPostAPI.addTaxonomy({ description, name, slug, taxonomy, parent });
		},
		addArticleViewCount: async (_, { postId = 0, postType = 'posts', metaKey = '', metaValue = '' }, { dataSources }) => {
			return dataSources.WordPressPostAPI.addArticleViewCount({ postId, postType, metaKey, metaValue });
		}
	}
}

export default resolvers;