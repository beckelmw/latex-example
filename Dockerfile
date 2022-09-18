ARG LATEX_IMAGE_TAG=latest
FROM pandoc/latex:$LATEX_IMAGE_TAG

# RUN tlmgr list
# RUN tlmgr update --self && \
#     tlmgr install \
#     paralist