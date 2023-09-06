
# Delete all SvelteKit routes
rm -R './src/routes';

# Recreate SvelteKit routes with same folder structure as examples
mkdir './src/routes';
cp -a './src/examples/.' './src/routes';

# Recursively go through all folders and create new route if index.svelte exists
find ./src/routes -maxdepth 5 -type d -print0 |
    while IFS= read -rd '' dir; 
    do 
        if [[ -f "${dir}/index.svelte" ]]; then
            cp -a ./templates/. ${dir}/
        fi
    done
