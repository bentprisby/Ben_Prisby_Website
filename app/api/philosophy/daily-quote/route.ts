import { NextResponse } from 'next/server'

// Collection of philosophical quotes from major philosophers
const philosophyQuotes = [
  {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
    era: "Ancient Greece, 470-399 BCE",
    context: "From his defense at trial, Socrates emphasized the importance of self-reflection and questioning one's beliefs and actions."
  },
  {
    quote: "I think, therefore I am.",
    author: "René Descartes",
    era: "Modern Philosophy, 1596-1650",
    context: "Descartes' foundational statement in establishing certainty through doubt, proving one's existence through the act of thinking."
  },
  {
    quote: "Man is condemned to be free.",
    author: "Jean-Paul Sartre",
    era: "Existentialism, 1905-1980",
    context: "Sartre's existentialist view that humans are burdened with complete freedom and responsibility for their choices."
  },
  {
    quote: "The only thing I know is that I know nothing.",
    author: "Socrates",
    era: "Ancient Greece, 470-399 BCE",
    context: "Socratic wisdom acknowledging the limits of human knowledge and the importance of intellectual humility."
  },
  {
    quote: "To be is to be perceived.",
    author: "George Berkeley",
    era: "Empiricism, 1685-1753",
    context: "Berkeley's idealist philosophy suggesting that existence depends on perception and consciousness."
  },
  {
    quote: "That which does not kill us makes us stronger.",
    author: "Friedrich Nietzsche",
    era: "19th Century Philosophy, 1844-1900",
    context: "Nietzsche's perspective on adversity as a catalyst for personal growth and resilience."
  },
  {
    quote: "The life of man is solitary, poor, nasty, brutish, and short.",
    author: "Thomas Hobbes",
    era: "Political Philosophy, 1588-1679",
    context: "Hobbes' description of the state of nature, arguing for the necessity of social contracts and government."
  },
  {
    quote: "Entities should not be multiplied without necessity.",
    author: "William of Ockham",
    era: "Medieval Philosophy, 1287-1347",
    context: "Ockham's Razor: the principle that the simplest explanation is usually the correct one."
  },
  {
    quote: "Man is born free, and everywhere he is in chains.",
    author: "Jean-Jacques Rousseau",
    era: "Enlightenment, 1712-1778",
    context: "Rousseau's observation on the contrast between natural human freedom and societal constraints."
  },
  {
    quote: "The owl of Minerva spreads its wings only with the falling of the dusk.",
    author: "Georg Wilhelm Friedrich Hegel",
    era: "German Idealism, 1770-1831",
    context: "Philosophy comes to understand a historical period only after it has passed; wisdom comes with reflection."
  },
  {
    quote: "I can control my passions and emotions if I can understand their nature.",
    author: "Spinoza",
    era: "Rationalism, 1632-1677",
    context: "Spinoza's belief that understanding our emotions through reason gives us power over them."
  },
  {
    quote: "The unexamined life is not worth living, but the examined life is unbearable.",
    author: "Saul Bellow",
    era: "20th Century, 1915-2005",
    context: "A modern twist on Socrates, suggesting that too much self-analysis can be paralyzing."
  },
  {
    quote: "One cannot step twice in the same river.",
    author: "Heraclitus",
    era: "Ancient Greece, 535-475 BCE",
    context: "Heraclitus' doctrine of flux: everything is constantly changing, and permanence is an illusion."
  },
  {
    quote: "The greatest happiness of the greatest number is the foundation of morals and legislation.",
    author: "Jeremy Bentham",
    era: "Utilitarianism, 1748-1832",
    context: "The foundational principle of utilitarianism: actions are right if they promote overall happiness."
  },
  {
    quote: "Cogito, ergo sum - I think, therefore I exist.",
    author: "René Descartes",
    era: "Modern Philosophy, 1596-1650",
    context: "The Latin formulation of Descartes' famous proof of existence through consciousness."
  },
  {
    quote: "Hell is other people.",
    author: "Jean-Paul Sartre",
    era: "Existentialism, 1905-1980",
    context: "From 'No Exit,' suggesting that conflict and judgment from others can be a form of torment."
  },
  {
    quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
    author: "Immanuel Kant",
    era: "Enlightenment, 1724-1804",
    context: "Kant's Categorical Imperative: a test for moral actions based on universalizability."
  },
  {
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    era: "Ancient Greece, 384-322 BCE",
    context: "Aristotle's virtue ethics emphasizing character development through consistent practice."
  },
  {
    quote: "God is dead. God remains dead. And we have killed him.",
    author: "Friedrich Nietzsche",
    era: "19th Century Philosophy, 1844-1900",
    context: "Nietzsche's declaration about the decline of religious faith and traditional values in modern society."
  },
  {
    quote: "The fundamental cause of trouble is that in the modern world, the stupid are cocksure while the intelligent are full of doubt.",
    author: "Bertrand Russell",
    era: "Analytic Philosophy, 1872-1970",
    context: "Russell's observation on the inverse relationship between confidence and wisdom."
  },
  {
    quote: "Happiness is the highest good.",
    author: "Aristotle",
    era: "Ancient Greece, 384-322 BCE",
    context: "Eudaimonia - Aristotle's concept that human flourishing and well-being is the ultimate aim of life."
  },
  {
    quote: "The mind is furnished with ideas by experience alone.",
    author: "John Locke",
    era: "Empiricism, 1632-1704",
    context: "Locke's tabula rasa theory: the mind begins as a blank slate, filled by sensory experience."
  },
  {
    quote: "Whereof one cannot speak, thereof one must be silent.",
    author: "Ludwig Wittgenstein",
    era: "Analytic Philosophy, 1889-1951",
    context: "The final proposition of the Tractatus: limits of language define limits of meaningful discourse."
  },
  {
    quote: "The more man meditates upon good thoughts, the better will be his world and the world at large.",
    author: "Confucius",
    era: "Ancient China, 551-479 BCE",
    context: "Confucian philosophy on the power of contemplation and positive thinking to improve society."
  },
  {
    quote: "Only the educated are free.",
    author: "Epictetus",
    era: "Stoicism, 50-135 CE",
    context: "Stoic wisdom that true freedom comes from understanding and mastering oneself through education."
  },
  {
    quote: "Man is the measure of all things.",
    author: "Protagoras",
    era: "Ancient Greece, 490-420 BCE",
    context: "A relativist view that truth and morality are subjective, varying from person to person."
  },
  {
    quote: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    era: "20th Century, 1904-1987",
    context: "Campbell's insight on confronting fears as a path to personal growth and self-discovery."
  },
  {
    quote: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    era: "19th Century Philosophy, 1844-1900",
    context: "Finding meaning and purpose in life enables us to endure great hardships."
  },
  {
    quote: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
    author: "Heraclitus",
    era: "Ancient Greece, 535-475 BCE",
    context: "Extended wisdom on constant change affecting both the world and ourselves."
  },
  {
    quote: "To live is to suffer, to survive is to find some meaning in the suffering.",
    author: "Friedrich Nietzsche",
    era: "19th Century Philosophy, 1844-1900",
    context: "Existential perspective that meaning-making is essential to enduring life's difficulties."
  },
  {
    quote: "The way to do is to be.",
    author: "Lao Tzu",
    era: "Ancient China, 6th Century BCE",
    context: "Taoist philosophy emphasizing being over doing, and natural action through non-action (wu wei)."
  }
]

export async function GET() {
  try {
    // Get current date and use it as seed for consistent daily quote
    const today = new Date()
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    
    // Simple hash function to generate consistent index from date
    let hash = 0
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    // Get quote index based on date hash
    const quoteIndex = Math.abs(hash) % philosophyQuotes.length
    const dailyQuote = philosophyQuotes[quoteIndex]

    return NextResponse.json(
      dailyQuote,
      {
        status: 200,
        headers: {
          // Cache for 12 hours to reduce server load while still updating daily
          'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error generating daily quote:', error)
    return NextResponse.json(
      { error: 'Failed to generate daily quote' },
      { status: 500 }
    )
  }
}

