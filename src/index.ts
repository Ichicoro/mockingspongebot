import { Telegraf } from "telegraf"
import { InlineQueryResult } from "telegraf/typings/core/types/typegram"
import { getConfig, mockTypes, spongeifyText } from "./utils"

// Setup config
import dotenv from "dotenv"
dotenv.config()

if (!process.env.BOT_API_KEY) {
  console.error("Missing API key")
  process.exit(1)
}
const bot = new Telegraf(process.env.BOT_API_KEY)

bot.start(ctx => ctx.reply("hElLo xd"))

bot.on('text', ctx => {
  ctx.reply(`${mockTypes.rsl.apply(ctx.message.text)}`)
})

bot.on('inline_query', ctx => {
  const result: InlineQueryResult[] = Object.entries(mockTypes).map(([key, mockType]) => {
    const text = mockType.apply(ctx.update.inline_query.query)
    return {
      title: text,
      type: "article",
      description: mockType.name,
      input_message_content: {
        message_text: text
      },
      id: `mock-${key}`
    } as InlineQueryResult
  })

  ctx.answerInlineQuery(result)
})

bot.command("license", ctx => {
  ctx.reply(`LICENSE
  
  `)
})

bot.launch()
console.log("Bot started...")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))