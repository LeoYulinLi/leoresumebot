const { dockStart } = require('@nlpjs/basic');

export async function initNlp() {
  const dock = await dockStart()
  const nlp = dock.get('nlp')
  return nlp
}
