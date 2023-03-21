const resolvers = {
	Query: {
		posts: async (_, { pageSize = 5 }, { dataSources } ) => {
			return dataSources.WordPressPostAPI.getAllPosts({ pageSize: pageSize } );
		},
		post: async ( _, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getPostById({ postId: id });
		},
		categories: async ( _, __, { dataSources } ) => {
			return dataSources.WordPressPostAPI.getAllCategories();
		},
		category: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getCategoryById( { categoryId: id } );
		},
		tags: async (_, __, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllTags();
		},
		tag: async (_, { id }, { dataSources } ) => {
			return dataSources.WordPressPostAPI.getTagById( { tagId: id } );
		},
		users: async (_, __, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllUsers();
		},
		user: async (_, { id }, { dataSources }) => {
			return dataSources.WordPressPostAPI.getUserById({ userId: id });
		},
		attachments: async (_, __, { dataSources }) => {
			return dataSources.WordPressPostAPI.getAllAttachments();
		},
	},
}

export default resolvers;