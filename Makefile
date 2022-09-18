.PHONY build:
build:
	docker run --rm --platform linux/amd64 \
		-v `pwd`:/data \
		-w /data \
		pandoc/latex \
		-f markdown \
		--template template.tex \
		-t latex \
		-o multiply_and_divide_integers.pdf \
		multiply_and_divide_integers.md