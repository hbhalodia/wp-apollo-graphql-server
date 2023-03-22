const typeDefs = `
	#graphql

	# The posts type.
	type Article {
		id: ID!,
		title: String,
		content: String,
		excerpt: String,
		slug: String!,
		link: String!,
		status: String,
		type: String,
		categories: [Category],
		tags: [Tag],
	}

	type Category {
		id: ID!,
		count: Int,
		description: String,
		name: String,
		taxonomy: String!,
		parent: Int,
		slug: String!,
	}

	type Tag {
		id: ID!,
		count: Int,
		link: String,
		description: String,
		name: String,
		slug: String!,
		taxonomy: String!,
	}

	type User {
		id: ID!,
		name: String,
		description: String,
		link: String,
		slug: String!,
	}

	type Media {
		id: ID!,
		slug: String!,
		type: String,
		link: String,
		title: String,
		description: String,
		media_type: String,
		mime_type: String,
		alt_text: String,
		source_url: String,
	}

	# The Query Type.
	type Query {
		articles(pageSize: Int, postType: String): [Article],
		categories(pageSize: Int): [Category],
		tags(pageSize: Int): [Tag],
		users(pageSize: Int): [User],
		attachments(pageSize: Int): [Media],
		article(id: ID!, postType: String): Article,
		user(id: ID!): User,
		category(id: ID!): Category,
		tag(id: ID!): Tag,
		attachment(id: ID!): Media,
	}
`;

export default typeDefs;
