# Recursively go through all folders and create endpoint for serving the code snippets
find ./src/routes -maxdepth 5 -type d -print0 |
    while IFS= read -rd '' dir; 
    do 
        if [[ -f "${dir}/+page.svelte" ]]; then
            cp -a ./templates/+server.ts ${dir}/+server.ts
        fi
    done
