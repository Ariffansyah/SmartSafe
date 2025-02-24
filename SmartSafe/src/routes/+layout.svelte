<script>
    let { children } = $props();
    import "../app.css";
</script>

<header class="bg-blue-500 h-12">
    <h1 class="text-white">Header</h1>
</header>

{@render children()}
