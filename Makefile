.PHONY build:
build:
	 docker run --platform linux/amd64 \
		-v `pwd`:/data \
		-w /data \
		pandoc/latex \
		-f markdown \
		--template template.tex \
		-t latex \
		-o multiply_and_divide_integers.pdf

.PHONY dev:
dev:
	node index.js| jq -r '.[0].markdown' | pandoc -f markdown \
                --template template.tex \
                -t latex \
                -o multiply_and_divide_integers.pdf

.PHONY md:
md:
	node index.js| jq -r '.[0].markdown'