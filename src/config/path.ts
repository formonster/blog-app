import path from 'path'

export default {
    template: path.join(__dirname, '../../dist/index.html'),
    staticDir: path.join(__dirname, '../static'),
    buildDir: path.join(__dirname, '../../dist'),
}