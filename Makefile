build_docker_dev:
	docker build -t jobai-web-dev:latest .
	docker tag jobai-web-dev:latest derwin334/jobai-web-dev:latest
	docker push derwin334/jobai-web-dev:latest