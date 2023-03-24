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
		postType: String,
		author: User,
		attachment: Media,
		categories: [Taxonomy],
		tags: [Taxonomy],
		solutions: [Taxonomy],
		services: [Taxonomy],
		industries: [Taxonomy],
		jobTypes: [Taxonomy],
	}

	type Taxonomy {
		id: ID!,
		count: Int,
		description: String,
		name: String,
		taxonomy: String!,
		parent: Taxonomy,
		slug: String!,
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
		slug: String,
		type: String,
		link: String,
		title: String,
		description: String,
		media_type: String,
		mime_type: String,
		alt_text: String,
		source_url: String,
	}

	type Setting {
		title: String,
		description: String,
		url: String,
		email: String,
		timezone: String,
		dateFormat: String,
		timeFormat: String,
		startOfWeek: Int,
		language: String,
		defaultCategory: Int,
		defaultPostFormat: String,
		postsPerPage: Int,
	}

	# The Query Type.
	type Query {
		articles(pageSize: Int, postType: String): [Article],
		taxonomies(pageSize: Int, taxonomy: String): [Taxonomy],
		users(pageSize: Int): [User],
		attachments(pageSize: Int): [Media],
		article(id: ID!, postType: String): Article,
		taxonomy(id: ID!, taxonomy: String): Taxonomy,
		user(id: ID!): User,
		attachment(id: ID!): Media,
		settings: Setting,
		hello: String,
	}

	type Mutation {
		addArticle( title: String, slug: String, author: Int, content: String, excerpt: String, status: String, postType: String ): Article,
		addTaxonomy( description: String, name: String, slug: String, taxonomy: String, parent: Int ): Taxonomy,
	}
`;

export default typeDefs;
