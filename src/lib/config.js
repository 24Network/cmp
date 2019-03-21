import log from './log';

// These options are documented at https://acdn.adnxs.com/cmp/docs/#/config
// We highly recommend reading the options as the defaults may not fit your goals.
const defaultConfig = {
	customPurposeListLocation: './purposes.json',
	// The location of the latest vendorlist to use.
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: './portal.html',
	storeConsentGlobally: false,
	storePublisherData: false,
	logging: false,
	localization: {
		sv: {
			banner: {
				title: 'Annonser hjälper oss att driva denna site',
				description:
					'När du besöker vår webbplats kan förvalda företag komma åt och använda viss information på din enhet och om den här webbplatsen för att visa relevanta annonser eller personligt innehåll.',
				links: {
					data: {
						title: 'Information som kan användas',
						description: ''
					},
					purposes: {
						title: 'Syfte för lagring av information',
						description: 'Hur informationen kan anvädas:'
					},
					manage: 'Ändra inställningar',
					accept: 'Fortsätt till site'
				}
			},
			summary: {
				title: 'Learn more about how information is being used?',
				description:
					"We and select companies may access and use your information for the below purposes. You may customize your choices below or continue using our site if you're OK with the purposes.",
				who: {
					title: 'Who is using this information?',
					description: `We and pre-selected companies will use your information. You can see each company in the links above or see the complete list here.`
				},
				what: {
					title: 'What title',
					description: ''
				}
			},
			details: {
				back: '',
				save: ''
			},
			purposes: {
				title: '',
				description: '',
				back: '',
				optoutdDescription: ``
			},
			vendors: {
				title: '',
				description: '',
				accept: '',
				acceptAll: '',
				acceptNone: '',
				optOut: '',
				back: ''
			}
		}
	},
	forceLocale: null,
	gdprApplies: true,
	gdprAppliesGlobally: false,
	allowedVendorIds: null,
	theme: {
		primaryColor: '#2D9CDB',
		primaryTextColor: '#fff',
		secondaryColor: '#626262',
		secondaryTextColor: '#fff',
		textLinkColor: '#2D9CDB',
		textColor: 'rgba(0, 0, 0, 0.8)',
		textLightColor: 'rgba(0, 0, 0, 0.5)'
	}
};

class Config {
	constructor() {
		this.update(defaultConfig);
	}

	update = updates => {
		if (updates && typeof updates === 'object') {
			const validKeys = Object.keys(defaultConfig);
			const { validUpdates, invalidKeys } = Object.keys(updates).reduce(
				(acc, key) => {
					if (validKeys.indexOf(key) > -1) {
						acc.validUpdates = {
							...acc.validUpdates,
							[key]: updates[key]
						};
					} else {
						acc.invalidKeys.push(key);
					}
					return acc;
				},
				{ validUpdates: {}, invalidKeys: [] }
			);

			Object.assign(this, validUpdates);
			if (invalidKeys.length) {
				log.warn(
					`Invalid CMP config values not applied: ${invalidKeys.join(
						', '
					)}`
				);
			}
		}
	};
}

export default new Config();
