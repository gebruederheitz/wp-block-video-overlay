build:
	@. $$NVM_DIR/nvm.sh &&\
		nvm use && \
		npm i && npm run build

test:
	@. $$NVM_DIR/nvm.sh &&\
		nvm use && \
		npm i && npm run lint

dev:
	@. $$NVM_DIR/nvm.sh &&\
 		nvm use && \
		npm i && npm run build

release:
	@. $$NVM_DIR/nvm.sh &&\
 		nvm use && \
		npm run release

prerelease:
	@. $$NVM_DIR/nvm.sh &&\
 		nvm use && \
		npm run beta-release
