module.exports = {
  header: 'Check Dist Update Changelog',
  releaseCommitMessageFormat: 'chore(release): v{{currentTag}} :tada:',
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'docs', section: '✏️Documentation' },
    { type: 'style', section: '💄 Styles', hidden: true },
    { type: 'refactor', section: '♻️ Code Refactoring' },
    { type: 'perf', section: '⚡ Performance Improvements' },
    { type: 'test', section: '✅ Tests', hidden: true },
    { type: 'build', section: '📦‍ Build System', hidden: true },
    { type: 'release', section: '🎉 release' },
    { type: 'chore', section: '🚀 Chore' },
    { type: 'revert', section: '⏪ Revert', hidden: true }
  ]
}
