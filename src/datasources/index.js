import { RESTDataSource } from '@apollo/datasource-rest';
import pkg from 'lodash';
const { isEmpty } = pkg;

export default class WordPressPostAPI extends RESTDataSource {

	constructor(options) {
		super();
		this.baseURL = "http://wp-graphql-backend.test/wp-json/";
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
			attachment: ! article.hasOwnProperty('featured_media') ? [] : this.getAttachmentById({ attachmentId: article.featured_media }),
			author: ! article.hasOwnProperty('author') ? []: this.getUserById({ userId: article.author }),
			categories: isEmpty(article.categories) ? [] : this.getCategoriesByIDs({ categoryIds: article.categories }),
			tags: isEmpty(article.tags) ? [] : this.getTagsByIDs({ tagIds: article.tags }),
			solutions: isEmpty(article.solution) ? [] : this.getSolutionsByIDs({ solutionIds: article.solution }),
			services: isEmpty(article.service) ? [] : this.getServicesByIDs({ serviceIds: article.service }),
			industries: isEmpty(article.industry) ? [] : this.getIndustriesByIDs({ industryIds: article.industry }),
			jobTypes: isEmpty(article.job_type) ? [] : this.getJobTypesByIDs({ jobTypeIds: article.job_type }),
		}
	}

	async getAllArticles({ pageSize, postType, category, page }) {

		const params = {
			page: page,
			per_page: pageSize
		}

		if ('' !== category) {
			params['categories'] = category;
		}

		const res = await this.get( 'wp/v2/' + postType, {
			params
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(article => this.ArticleReducer(article))
			: [];
	}

	async getArticleById({ postId, postType }) {
		const res = await this.get(`wp/v2/${postType}/${postId}`);
		return this.ArticleReducer(res);
	}

	async addArticle({ title, content, author, excerpt, slug, status, postType }) {
		const res = await this.post('wp/v2/' + postType, {
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

	async getAllTaxonomies({ pageSize, taxonomy, slug }) {
		const res = await this.get('wp/v2/' + taxonomy, {
			params: {
				per_page: pageSize,
				slug: slug,
			},
			// We can add multiple params such as sorting, offset etc which is provided by rest API.
		});
		return Array.isArray(res)
			? res.map(taxonomy => this.TaxonomyReducer(taxonomy))
			: [];
	}

	async getTaxonomyById({ taxonomyId, taxonomy }) {
		const res = await this.get(`wp/v2/${taxonomy}/${taxonomyId}`);
		return this.TaxonomyReducer(res);
	}

	async getParentTaxonomy({ id, taxonomy }) {

		if ('category' === taxonomy) {
			taxonomy = 'categories';
		}

		if ('post_tag' === taxonomy) {
			taxonomy = 'tags';
		}

		const res = await this.get(`wp/v2/${taxonomy}/${id}`);
		return this.TaxonomyReducer(res);
	}

	async addTaxonomy({ name, description, taxonomy, parent, slug }) {
		const res = await this.post('wp/v2/' + taxonomy, {
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
		const res = await this.get('wp/v2/categories', {
			params: {
				include: categoryIds,
			},
		});
		return Array.isArray(res)
			? res.map(category => this.TaxonomyReducer(category))
			: [];
	}

	async getTagsByIDs({ tagIds }) {
		const res = await this.get('wp/v2/tags', {
			params: {
				include: tagIds,
			},
		});
		return Array.isArray(res)
			? res.map(tag => this.TaxonomyReducer(tag))
			: [];
	}

	async getSolutionsByIDs({ solutionIds }) {
		const res = await this.get('wp/v2/solution', {
			params: {
				include: solutionIds,
			},
		});
		return Array.isArray(res)
			? res.map(solution => this.TaxonomyReducer(solution))
			: [];
	}

	async getServicesByIDs({ serviceIds }) {
		const res = await this.get('wp/v2/service', {
			params: {
				include: serviceIds,
			},
		});
		return Array.isArray(res)
			? res.map(service => this.TaxonomyReducer(service))
			: [];
	}

	async getIndustriesByIDs({ industryIds }) {
		const res = await this.get('wp/v2/industry', {
			params: {
				include: industryIds,
			},
		});
		return Array.isArray(res)
			? res.map(industry => this.TaxonomyReducer(industry))
			: [];
	}

	async getJobTypesByIDs({ jobTypeIds }) {
		const res = await this.get('wp/v2/job_type', {
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
		const res = await this.get('wp/v2/users', {
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
		const res = await this.get('wp/v2/users/' + userId);
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
		const res = await this.get('wp/v2/media', {
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

		if (0 == attachmentId) {
			return null;
		}

		const res = await this.get('wp/v2/media/' + attachmentId);
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
		const res = await this.get('wp/v2/settings');
		return this.SettingsReducer(res);
	}

	MenuReducer(menu) {
		return {
			name: menu.name,
			slug: menu.slug,
			taxonomy: menu.taxonomy,
			termId: menu.term_id,
			menuItems: this.getMenuItemsSlug({ slug: menu.slug})
		}
	}

	MenuItemsReducer(menuItem) {
		return {
			name: menuItem.name,
			slug: menuItem.slug,
			taxonomy: menuItem.taxonomy,
			items: this.getMenuItemsReducer(menuItem.items),
		}
	}

	MenuItemReducer(item) {
		return {
			title: item.title,
			slug: item.slug,
			id: item.ID,
		}
	}

	getMenuItemsReducer(items) {
		return Array.isArray(items)
			? items.map(menuItem => this.MenuItemReducer(menuItem))
			: [];
	}

	async getMenus() {
		const res = await this.get('menus/v1/menus/');
		return Array.isArray(res)
			? res.map(menu => this.MenuReducer(menu))
			: [];
	}

	async getMenuItemsSlug({ slug }) {
		const res = await this.get('menus/v1/menus/' + slug);
		const newres = [];
		newres.push(res);
		return Array.isArray(newres)
			? newres.map(menuItem => this.MenuItemsReducer(menuItem))
			: [];
	}
}
