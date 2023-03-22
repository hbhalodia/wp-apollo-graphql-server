import { RESTDataSource } from '@apollo/datasource-rest';

export default class WordPressPostAPI extends RESTDataSource {

	constructor() {
		super();
		this.baseURL = "https://rtcamp.com/wp-json/wp/v2/";
	}

	PostReducer(post) {
		return {
			id: post.id,
			title: post.title.rendered,
			content: post.content.rendered,
			excerpt: post.excerpt.rendered,
			slug: post.slug,
			link: post.link,
			categories: post.categories ? this.getCategoriesByIDs(post.categories) : [],
			tags: post.tags ? this.getTagsByIDs(post.tags) : [],
		}
	}

	async getAllPosts({ pageSize }) {

		const res = await this.get('posts', {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(post => this.PostReducer(post))
			: [];
	}

	async getPostById({ postId }) {
		const res = await this.get('posts/' + postId);
		return this.PostReducer(res);
	}

	CategoryReducer(category) {
		return {
			id: category.id,
			count: category.count,
			description: category.description,
			name: category.name,
			taxonomy: category.taxonomy,
			parent: category.parent,
			slug: category.slug,
		}
	}

	async getAllCategories({ pageSize }) {
		const res = await this.get('categories', {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(category => this.CategoryReducer(category))
			: [];
	}

	async getCategoryById({ categoryId }) {
		const res = await this.get('categories/' + categoryId);
		return this.CategoryReducer(res);
	}

	async getCategoriesByIDs(categoryIds) {
		const res = await this.get('categories', {
			params: {
				include: categoryIds,
			},
		});
		return Array.isArray(res)
			? res.map(category => this.CategoryReducer(category))
			: [];
	}

	TagReducer(tag) {
		return {
			id: tag.id,
			count: tag.count,
			link: tag.link,
			description: tag.description,
			name: tag.name,
			slug: tag.slug,
			taxonomy: tag.taxonomy,
		}
	}

	async getAllTags({ pageSize }) {
		const res = await this.get('tags', {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(tag => this.TagReducer(tag))
			: [];
	}

	async getTagById({ tagId }) {
		const res = await this.get('tags/' + tagId);
		return this.TagReducer(res);
	}

	async getTagsByIDs(tagIds) {
		const res = await this.get('tags', {
			params: {
				include: tagIds,
			},
		});
		return Array.isArray(res)
			? res.map(tag => this.TagReducer(tag))
			: [];
	}

	UserReducer(user) {
		return {
			id: user.id,
			name: user.name,
			description: user.description,
			link: user.link,
			slug: user.slug,
		}
	}

	async getAllUsers({ pageSize }) {
		const res = await this.get('users', {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(user => this.UserReducer(user))
			: [];
	}

	async getUserById({ userId }) {
		const res = await this.get('users/' + userId);
		return this.UserReducer(res);
	}

	AttachmentReducer(attachment) {
		return {
			id: attachment.id,
			slug: attachment.slug,
			type: attachment.type,
			link: attachment.link,
			title: attachment.title.rendered,
			description: attachment.description.rendered,
			media_type: attachment.media_type,
			mime_type: attachment.mime_type,
			alt_text: attachment.alt_text,
			source_url: attachment.source_url,
		}
	}

	async getAllAttachments({ pageSize }) {
		const res = await this.get('media', {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(attachment => this.AttachmentReducer(attachment))
			: [];
	}

	async getAttachmentById({ attachmentId }) {
		const res = await this.get('media/' + attachmentId);
		return this.AttachmentReducer(res);
	}
}
