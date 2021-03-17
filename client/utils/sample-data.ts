import { User, Plan } from '../interfaces';

/** Dummy user data. */
export const sampleUserData: User[] = [
	{
		id: 101,
		name: 'Alice',
		email: 'fff',
		password: 'fff',
		nickname: 'Alice',
		phone: '231',
		address: '',
	},
	{
		id: 102,
		name: 'Bob',
		email: 'fff',
		password: 'fff',
		nickname: 'Alice',
		phone: '231',
		address: '',
	},
	{
		id: 103,
		name: 'Caroline',
		email: 'fff',
		password: 'fff',
		nickname: 'Alice',
		phone: '231',
		address: '',
	},
	{
		id: 104,
		name: 'Dave',
		email: 'fff',
		password: 'fff',
		nickname: 'Alice',
		phone: '231',
		address: '',
	},
];

// 테스트용 데이터
export const samplePlanData: Plan[] = [
	{
		id: 1,
		title: '신나는 빠히 여행',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
		price: 520000,
		sleepDays: 2,
		travelDays: 3,
		tags: ['문화재', '감성'],
	},

	{
		id: 2,
		title: '리옹에서 맛집 탐방',
		description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
		price: 300000,
		sleepDays: 1,
		travelDays: 2,
		tags: ['문화재', '먹부림'],
	},
	{
		id: 3,
		title: '지녹과 함께하는 만년설 먹방',
		description: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
		price: 1030000,
		sleepDays: 2,
		travelDays: 3,
		tags: ['대자연', '먹부림'],
	},
	{
		id: 4,
		title: '공기좋고 물좋고 힐링여행',
		description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
		price: 240000,
		sleepDays: 3,
		travelDays: 4,
		tags: ['대자연', '힐링'],
	},
	{
		id: 5,
		title: '옥토버페스트 100배 즐기기',
		description: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
		price: 1400000,
		sleepDays: 6,
		travelDays: 7,
		tags: ['감성', '먹부림'],
	},
];
