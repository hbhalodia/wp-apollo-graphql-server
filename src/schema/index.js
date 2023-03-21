const typeDefs = `
	#graphql

	# The posts type.
	type Post {
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
		posts( pageSize: Int ): [Post],
		categories: [Category],
		tags: [Tag],
		users: [User],
		post(id: ID!): Post,
		user(id: ID!): User,
		category(id: ID!): Category,
		tag(id: ID!): Tag,
		attachments: [Media],
	}
`;

export default typeDefs;
