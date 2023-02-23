import requests
from bs4 import BeautifulSoup

def quizlet_scrape(url):
    # The header must be set in order to avoid bot detection XD
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0'}
    soup = BeautifulSoup(requests.get(url, headers=headers).content, 'html.parser')

    terms = []
    answers = []

    for _, (question, answer) in enumerate(zip(soup.select('a.SetPageTerm-wordText'), soup.select('a.SetPageTerm-definitionText')), 1):
        terms.append(question.get_text(strip=True, separator='\n'))
        answers.append(answer.get_text(strip=True, separator='\n'))

    return [terms, answers]
