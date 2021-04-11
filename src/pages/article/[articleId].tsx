import styled from 'styled-components'
import ArticleMedia from '../../components/ArticleMedia'
import { Button } from '../../components/Button'
import { ICON_BOOKMARK_ON } from '../../styles/icons'
import snippets from '../../styles/snippets'

const Timestamp = styled.div`
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.xs};
  font-weight: 400;
  margin: 20px 0;
`

const H1 = styled.div`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize.xl};
  font-weight: 700;
  line-height: 1.14705882;
`

const SubHeader = styled.p`
  ${snippets.fontFamily.serif};
  ${snippets.fontSize.md};
  font-weight: 700;
  line-height: 1.3;
  margin-top: 20px;
`

const Separator = styled.hr`
  margin: 15px 0;
  border-bottom: 2px solid ${(props) => props.theme.colors.sectionBorder};
`
const Content = styled.section`
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.base};
  white-space: pre-line;
  line-height: 1.42857143;
`

const MainContainer = styled.div`
  @media (min-width: ${(props) => props.theme.screen.md}) {
    display: grid;
    grid-template-columns: minmax(57%, 635px) auto;
    grid-column-gap: 30px;

    ${Content} {
      grid-column-start: 1;
    }
  }
`

const MediaList = styled.section`
  margin-top: 70px;

  @media (min-width: ${(props) => props.theme.screen.md}) {
    margin-top: 0;
  }
`

const mockContent = `South Africa is the worst-affected country on the continent, with more than a quarter of all infections. But most countries have fewer than 1,000 infections, said Moeti, and the UN does not believe that severe cases are going undetected.

Africa has recorded fewer than 6,000 deaths, according to an AFP tally, but just five countries account for 70% of these: South Africa, Algeria, Nigeria, Egypt and Sudan.

In Africa, “the pandemic is still concentrated in and around capital cities but we are seeing more and more cases spread out into the provinces,” Moeti said.

She said that in most countries on the continent, the virus entered capitals through international flights from Europe.

Africa’s relatively young population compared to other continents, and in-built experience of dealing with disease outbreaks have been cited as reasons why Africa has not so far seen the death rates experienced on other continents.

Moeti said early action by African countries had helped keep the numbers low - but constant vigilance was still needed.

The US remains the worst-affected country worldwide, passing 2 million infections on Thursday. Spikes have been recorded in several states, including Arizona, which is confirming more than 1,000 cases daily.

US president Donald Trump has introduced a policy stopping attendees at his rallies from suing the campaign or venue if they contract coronavirus at the events. A statement on the campaign website page for a rally in Tulsa says: “By clicking register below, you are acknowledging that an inherent risk of exposure to COVID-19 exists in any public place where people are present. By attending the Rally, you and any guests voluntarily assume all risks related to exposure to COVID-19 and agree not to hold Donald J. Trump for President, Inc.; BOK Center; ASM Global; or any of their affiliates … liable for any illness or injury.”

Stocks fell sharply Thursday on Wall Street as coronavirus cases increased, deflating recent optimism for a quick economic recovery. The DOW Jones Industrial Average saw its worst day in weeks, closing down almost 7%. Asian shares were moderately lower on Friday as a result of the overnight rout.

The US Federal Reserve warned on Wednesday that a second wave of infections risks prolonging the country’s recovery. The Fed predicted unemployment will still be at around 9% by December – close to the worst levels seen in the GFC – but Federal Reserve chair Jerome Powell said that a second outbreak could mean that figure was optimistic.
`

export default function ArticleView() {
  return (
    <div>
      <Button>{ICON_BOOKMARK_ON} ADD BOOKMARK</Button>
      <Timestamp>Fri 12 Jun 2020 06.40 BST</Timestamp>
      <MainContainer>
        <div>
          <H1>
            Global report: WHO warns of accelerating Covid-19 infections in
            Africa
          </H1>
          <SubHeader>
            Continent is seeing more cases spread to the provinces; Trump
            supporters can’t sue over catching Covid-19 at rallies; Brazil
            confirms 30,000 new cases
          </SubHeader>
          <Separator />
        </div>
        <Content>{mockContent}</Content>
        <MediaList>
          <ArticleMedia
            image="https://via.placeholder.com/445x267.png"
            caption="A woman walks along a flooded road amidst a storm in the Masiphumelele informal settlement in Cape Town Photograph: Nic Bothma/EPA"
          />
        </MediaList>
      </MainContainer>
    </div>
  )
}
