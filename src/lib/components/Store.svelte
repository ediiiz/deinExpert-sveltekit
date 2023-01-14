<script>
	import { createMediaStore } from 'svelte-media-queries'
	import Data from './Data.svelte';
	const query = {
		mobile: '(max-width: 480px)',
		tablet: '(min-width: 480px) and (max-width: 768px)',
		largeTablet: '(min-width: 768px) and (max-width: 1200px)',
		desktop: '(min-width: 1200px)',
		other: ['(min-width: 1200px)', '(max-height: 900px)'],
		themes: {
			dark: '(prefers-color-scheme: dark)',
			light: '(prefers-color-scheme: light)',
		},
	}
	const matches = createMediaStore(query)
</script>

<Data name='$matches' data='{$matches}'/>
