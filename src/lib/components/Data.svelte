<script>
  export let data = {}
  export let name = ''
</script>

<pre><code>{(name ? `${name} = ` : '') + JSON.stringify(data, null, 2)}</code></pre>
