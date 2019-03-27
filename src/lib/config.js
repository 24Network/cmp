import log from './log';

// These options are documented at https://acdn.adnxs.com/cmp/docs/#/config
// We highly recommend reading the options as the defaults may not fit your goals.
const defaultConfig = {
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	customPurposeListLocation: '/cmp/purposes.json',
	globalConsentLocation: '/cmp/portal.html',
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
						title: 'Information som kan komma att användas.',
						description: `<ul>
                                        <li>Typ av webbläsare och inställningar</li>
                                        <li>Information om enhetens operativsystem</li>
                                        <li>Information om cookies</li>
                                        <li>Information om andra identifierare som tilldelats enheten</li>
                                        <li>Den IP-adress från vilken enheten får åtkomst till en kunds webbplats eller mobilapplikation</li>
                                        <li>Information om användarens aktivitet på den enheten, inklusive webbsidor och mobilappar som har besökts eller använts</li>
                                        <li>Information om den geografiska platsen för enheten när den kommer åt en webbplats eller mobilapplikation</li>
                                    </ul>`
					},
					purposes: {
						title: 'Syfte för lagring av information.',
						description: `<ul>
                                        <li>Informationslagring och åtkomst</li>
                                        <li>Anpassning</li>
                                        <li>Annonsval, leverans, rapportering</li>
                                        <li>Innehållsval, leverans, rapportering</li>
                                        <li>Mått</li>
                                    </ul>`
					},
					manage: 'Ändra inställningar',
					accept: 'Fortsätt till webbplats'
				}
			},
			summary: {
				title: 'Läs mer om hur information används?',
				description:
					'Vi och valda företag kan komma åt och använda din information för nedanstående ändamål. Du kan anpassa dina val nedan eller fortsätta använda vår webbplats om du är okej med syftet.',
				detailLink: 'Läs Mer & Ange Inställningar',
				who: {
					title: 'Vem använder den här informationen?',
					description: `Vi och förvalda företag kommer att använda din information. Du kan se varje företag i länkarna ovan eller`,
					link: 'se hela listan här.'
				},
				what: {
					title: 'Vilken information används?',
					description: 'Olika företag använder olika uppgifter,',
					link: 'se den fullständiga listan här.'
				}
			},
			details: {
				back: 'Tillbaka',
				save: 'Forstätt till webbplats'
			},
			purposes: {
				title: 'Vilken information används?',
				description:
					'Nedan finns en komplett lista över de uppgifter som kan samlas in.',
				back: 'Tillbaka',
				items: `<ul>
                            <li>Typ av webbläsare och dess inställningar</li>
                            <li>Information om enhetens operativsystem</li>
                            <li>Information om cookies</li>
                            <li>Information om andra identifierare som tilldelats enheten</li>
                            <li>Den IP-adress från vilken enheten får åtkomst till en kunds webbplats eller mobilapplikation</li>
                            <li>Information om användarens aktivitet på den enheten, inklusive webbsidor och mobilappar som har besökts eller använts</li>
                            <li>Information om den geografiska platsen för enheten när den kommer åt en webbplats eller mobilapplikation</li>
                        </ul>`,
				optoutdDescription: `Beroende på vilken typ av data de samlar in, använder, behandlar och andra faktorer, inklusive integritet genom design, är vissa partners beroende av ditt samtycke medan andra kräver att du avregistrerar dig. För information om varje leverantör och möjligheten att utöva dina val, se nedan. Vill du välja bort, besök då <a href="http://optout.networkadvertising.org/?c=1#!/" target="_blank">NAI</a>, <a href="http://optout.aboutads.info/?lang=EN&c=2#!/" target="_blank">DAA</a> eller <a href="http://www.youronlinechoices.com/" target="_blank">EDAA</a> för mer information.`
			},
			vendors: {
				title: 'Vem använder informationen?',
				description:
					'Nedan finner du den fullständiga listan över företag som kommer att använda din information. Vänligen se deras sekretesspolicy för mer information.',
				accept: 'Acceptera',
				acceptAll: 'Tillåt alla',
				acceptNone: 'Tillåt ingen',
				optOut: 'Kräver avhopp',
				back: 'Tillbaka'
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
