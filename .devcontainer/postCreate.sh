# Force pnpm to use global store instead of $PWD, ref: https://stackoverflow.com/questions/76573556/pnpm-use-docker-volume-as-store-path
pnpm config -g set store-dir $PNPM_HOME/store
