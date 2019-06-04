node {
    def image 
    def DOCKER_HOST="unix:///var/run/docker.sock"

    try{
        stage ('Checkout') {
            updateGitlabCommitStatus name: 'build', state: 'pending'
            sh "rm -rf *"
            checkout scm
        }

        stage ('Test') {                        
            updateGitlabCommitStatus name: 'build', state: 'running'
            docker.withServer(DOCKER_HOST) {
                image= docker.image("registry.sigis.com.ve/sigis/angular-docker")
                image.inside(){ c ->
                    sh 'npm install'
                }
            }
        }

        stage ('Build') {
            if(env.gitlabActionType == 'MERGE') {   
                docker.withServer(DOCKER_HOST) {
                    image= docker.image("registry.sigis.com.ve/sigis/angular-docker")
                    image.inside(){ c ->
                        sh "ng build --configuration=${ENVIRONMENT} --prod --aot --build-optimizer --base-href=${BASE_HREF}"
                    }
                    image = docker.build("${PRODUCT_NAME}/webadmin", 
                    "--build-arg PRODUCT_NAME=${PRODUCT_NAME} "+
                    "--build-arg SERVICE_NAME=${SERVICE_NAME} "+
                    "--build-arg MAINTAINER=${gitlabUserEmail} "+
                    "--build-arg VERSION=${env.BUILD_NUMBER} .")
                }
            }
        }

        stage ('Publish') {
            if(env.gitlabActionType == 'MERGE') {   
                docker.withServer(DOCKER_HOST) {
                    docker.withRegistry('https://registry.sigis.com.ve') {
                        image.push("${env.BUILD_NUMBER}")
                        image.push("latest")
                    }                   
                }

                build job: env.PRODUCT_NAME + "-stack" ,
                 propagate: true, 
                 quietPeriod: 0, 
                 wait: false,
                 parameters: [
                    stringParam(name: 'WEBAPP_TAG', value: ""+currentBuild.number)
                 ]

                acceptGitLabMR mergeCommitMessage: "Jenkins Accepted Merge of ${gitlabSourceBranch} Build#${env.BUILD_NUMBER}"
            }
        }

        currentBuild.result = 'SUCCESS'
        updateGitlabCommitStatus name: 'build', state: 'success'        
    } catch (err) {
        currentBuild.result = 'FAILURE'
        updateGitlabCommitStatus name: 'build', state: 'failed'
        echo err.toString()
    } finally {
        step([$class: 'Mailer', 
            notifyEveryUnstableBuild: true, 
            recipients: "${gitlabUserEmail}, ${DEFAULT_MAIL}",
            sendToIndividuals: true]
        )
    }       
}
