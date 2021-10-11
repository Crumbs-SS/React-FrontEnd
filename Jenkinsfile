pipeline {
    agent any
    tools {
        nodejs 'nodejs'
        // scanner 'SonarScanner'
    }
    
    stages{

        stage('Build'){
            steps{
                sh 'npm install --force'
                withCredentials([string(credentialsId: 'react-production-alb', variable: 'REACT_APP_API_URL')]) {
                    sh 'npm run build'
                }
            }
        }
        
//         stage('SonarQube Analysis') {
//             steps {
// //                script {
// //                    scannerHome = tool 'SonarScanner'
// //                }
            
//                 withSonarQubeEnv('SonarQube Scanner') {
//   //                  sh "${scannerHome}/bin/sonar-scanner"
//                       sh "${scanner}/bin/sonar-scanner"
//                 }
//             }
//         }

        stage('Deploy'){
            steps{
                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'jenkins_credentials', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'aws s3 cp ./build/ s3://crumbs-client --recursive --acl public-read'
              }
            }
        }
    }

}
