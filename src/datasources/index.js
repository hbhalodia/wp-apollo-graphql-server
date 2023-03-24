import { RESTDataSource } from '@apollo/datasource-rest';
import pkg from 'lodash';
const { isEmpty } = pkg;

export default class WordPressPostAPI extends RESTDataSource {

	constructor(options) {
		super();
		this.baseURL = "http://rtcamplocal.local/wp-json/wp/v2/";
		this.token = options.token;
	}

	willSendRequest(_path, request) {
		request.headers['Authorization'] = this.token;
	}

	ArticleReducer(article) {
		return {
			id: article.id,
			title: article.title.rendered,
			content: article.content.rendered,
			excerpt: article.excerpt.rendered,
			slug: article.slug,
			link: article.link,
			postType: article.type,
			attachment: isEmpty(article.featured_media) ? null : this.getAttachmentById({ attachmentId: article.featured_media }),
			author: isEmpty(String(article.author)) ? []: this.getUserById({ userId: article.author }),
			categories: isEmpty(article.categories) ? [] : this.getCategoriesByIDs({ categoryIds: article.categories }),
			tags: isEmpty(article.tags) ? [] : this.getTagsByIDs({ tagIds: article.tags }),
			solutions: isEmpty(article.solution) ? [] : this.getSolutionsByIDs({ solutionIds: article.solution }),
			services: isEmpty(article.service) ? [] : this.getServicesByIDs({ serviceIds: article.service }),
			industries: isEmpty(article.industry) ? [] : this.getIndustriesByIDs({ industryIds: article.industry }),
			jobTypes: isEmpty(article.job_type) ? [] : this.getJobTypesByIDs({ jobTypeIds: article.job_type }),
		}
	}

	async getAllArticles({ pageSize, postType }) {

		const res = await this.get(postType, {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(article => this.ArticleReducer(article))
			: [];
	}

	async getArticleById({ postId, postType }) {
		const res = await this.get(`${postType}/${postId}`);
		return this.ArticleReducer(res);
	}

	async addArticle({ title, content, author, excerpt, slug, status, postType }) {
		const res = await this.post(postType, {
			body: {
				title,
				content,
				excerpt,
				slug,
				author,
				status,
			}
		});
		return this.ArticleReducer(res);
	}

	TaxonomyReducer(taxonomy) {
		return {
			id: taxonomy.id,
			count: taxonomy.count,
			description: taxonomy.description,
			name: taxonomy.name,
			taxonomy: taxonomy.taxonomy,
			parent: taxonomy.parent ? this.getParentTaxonomy({ id: taxonomy.parent, taxonomy: taxonomy.taxonomy }) : null,
			slug: taxonomy.slug,
		}
	}

	async getAllTaxonomies({ pageSize, taxonomy }) {
		const res = await this.get(taxonomy, {
			params: {
				per_page: pageSize,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(taxonomy => this.TaxonomyReducer(taxonomy))
			: [];
	}

	async getTaxonomyById({ taxonomyId, taxonomy }) {
		const res = await this.get(`${taxonomy}/${taxonomyId}`);
		return this.TaxonomyReducer(res);
	}

	async getParentTaxonomy({ id, taxonomy }) {

		if ('category' === taxonomy) {
			taxonomy = 'categories';
		}

		if ('post_tag' === taxonomy) {
			taxonomy = 'tags';
		}

		const res = await this.get(`${taxonomy}/${id}`);
		return this.TaxonomyReducer(res);
	}

	async addTaxonomy({ name, description, taxonomy, parent, slug }) {
		const res = await this.post(taxonomy, {
			body: {
				name,
				description,
				slug,
				parent
			}
		});
		return this.TaxonomyReducer(res);
	}

	async getCategoriesByIDs({ categoryIds }) {
		const res = await this.get('categories', {
			params: {
				include: categoryIds,
			},
		});
		return Array.isArray(res)
			? res.map(category => this.TaxonomyReducer(category))
			: [];
	}

	async getTagsByIDs({ tagIds }) {
		const res = await this.get('tags', {
			params: {
				include: tagIds,
			},
		});
		return Array.isArray(res)
			? res.map(tag => this.TaxonomyReducer(tag))
			: [];
	}

	async getSolutionsByIDs({ solutionIds }) {
		const res = await this.get('solution', {
			params: {
				include: solutionIds,
			},
		});
		return Array.isArray(res)
			? res.map(solution => this.TaxonomyReducer(solution))
			: [];
	}

	async getServicesByIDs({ serviceIds }) {
		const res = await this.get('service', {
			params: {
				include: serviceIds,
			},
		});
		return Array.isArray(res)
			? res.map(service => this.TaxonomyReducer(service))
			: [];
	}

	async getIndustriesByIDs({ industryIds }) {
		const res = await this.get('industry', {
			params: {
				include: industryIds,
			},
		});
		return Array.isArray(res)
			? res.map(industry => this.TaxonomyReducer(industry))
			: [];
	}

	async getJobTypesByIDs({ jobTypeIds }) {
		const res = await this.get('job_type', {
			params: {
				include: jobTypeIds,
			},
		});
		return Array.isArray(res)
			? res.map(jobType => this.TaxonomyReducer(jobType))
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

	SettingsReducer(settings) {
		return {
			title: settings.title,
			description: settings.description,
			url: settings.url,
			email: settings.email,
			timezone: settings.timezone,
			dateFormat: settings.date_format,
			timeFormat: settings.time_format,
			startOfWeek: settings.start_of_week,
			language: settings.language,
			defaultCategory: settings.default_category,
			defaultPostFormat: settings.default_post_format,
			postsPerPage: settings.posts_per_page,

		}
	}

	async getSettings() {
		const res = await this.get('settings');
		return this.SettingsReducer(res);
	}
}
