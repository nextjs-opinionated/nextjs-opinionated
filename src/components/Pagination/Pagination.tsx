import classnames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  className?: string
  previousButtonTitle?: string
  nextButtonTitle?: string
  onPageSet: (number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  totalPages = 1,
  currentPage = 1,
  onPageSet,
  previousButtonTitle = 'Previous',
  nextButtonTitle = 'Next',
}) => {
  const [listNumberOfPages, listNumberOfPagesSet] = useState<number[]>([])

  const handlePagination = useCallback(() => {
    let startOfPageOnList = 0
    let endOfPageOnList = 0

    if (currentPage === 1) {
      startOfPageOnList = currentPage
    } else if (currentPage === 2) {
      startOfPageOnList = currentPage - 1
    } else if (currentPage >= totalPages) {
      if (totalPages > 2) {
        startOfPageOnList = totalPages - 1
      } else if (totalPages === 1) {
        startOfPageOnList = totalPages
      }
    } else {
      startOfPageOnList = currentPage - 2
    }

    if (totalPages <= currentPage) {
      endOfPageOnList = totalPages
    } else if (totalPages === currentPage + 1) {
      endOfPageOnList = currentPage + 1
    } else {
      endOfPageOnList = currentPage + 2
    }
    const listOfNumbers: number[] = []
    for (let i = startOfPageOnList; i <= endOfPageOnList; i += 1) {
      listOfNumbers.push(i)
    }

    listNumberOfPagesSet(listOfNumbers)
  }, [currentPage, totalPages])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageSet(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageSet(currentPage + 1)
    }
  }

  const handlePage = (page) => {
    onPageSet(page)
  }

  useEffect(() => {
    handlePagination()
  }, [currentPage, handlePagination])
  return (
    <div data-testid='button' className='mt-10 btn-group'>
      <button
        type='button'
        onClick={() => {
          handlePreviousPage()
        }}
        className={classnames(`btn ${className}`, {
          'btn-disabled cursor-not-allowed': currentPage === 1,
        })}
      >
        {previousButtonTitle}
      </button>
      {listNumberOfPages.map((item) => (
        <button
          type='button'
          key={item}
          onClick={() => {
            handlePage(item)
          }}
          className={classnames(`btn ${className}`, {
            'btn-active': item === currentPage,
          })}
        >
          {item}
        </button>
      ))}
      <button
        type='button'
        onClick={() => {
          handleNextPage()
        }}
        className={classnames(`btn ${className}`, {
          'btn-disabled cursor-not-allowed': totalPages === currentPage,
        })}
      >
        {nextButtonTitle}
      </button>
    </div>
  )
}
