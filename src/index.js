/** @jsx jsx */
import { useState, useEffect } from 'react'
import { remote, ipcRenderer } from 'electron'
import { jsx, Styled } from 'theme-ui'
import { render } from 'react-dom'
import { Editor, serializer, stringifyMDX } from '@blocks/editor'
import { Folder, FileText, ArrowLeft } from 'react-feather'
import debounce from 'lodash.debounce'

import Layout from './layout'
import { getFile, getFiles, getParentDirectory } from './filesystem'

const App = () => {
  const [openFilePathname, setOpenFilePathname] = useState(null)
  const [openFileContents, setOpenFileContents] = useState('')
  const [dirname, setDirname] = useState(remote.app.getPath('home'))
  const [files, setFiles] = useState([])

  const updateFileList = async () => {
    const filelist = await getFiles({ dirname })
    setFiles(filelist)
  }

  const updateOpenFileContents = async () => {
    const contents = await getFile(openFilePathname)
    setOpenFileContents(contents)
  }

  const handleParentDirectorySelection = () => {
    const parentDir = getParentDirectory(dirname)
    setDirname(parentDir)
  }

  const handleFileListSelection = async file => {
    if (file.isDirectory) {
      setDirname(file.pathname)
    } else {
      setOpenFilePathname(file.pathname)
    }
  }

  const write = debounce(({ value }) => {
    const content = stringifyMDX(serializer.serialize(value))
    ipcRenderer.send('write-file', {
      filename: openFilePathname,
      content
    })
  })

  useEffect(() => {
    updateFileList()
  }, [dirname])

  useEffect(() => {
    updateOpenFileContents()
  }, [openFilePathname])

  if (openFilePathname && openFileContents) {
    const parentDir = getParentDirectory(openFilePathname)
    
    return (
      <Styled.root
        css={{
          maxWidth: '48em',
          padding: 32,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '40px'
        }}
      >
        <Styled.a
          css={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '2px'
          }}
          onClick={() => {
            handleFileListSelection(parentDir)
          }}
        >
          <ArrowLeft />
          <span sx={{ ml: 2 }}>Back</span>
        </Styled.a>
        <Styled.p
          css={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
            <FileText />
            <span sx={{ ml: 2 }}>{openFilePathname}</span>
        </Styled.p>
        <Editor
          initialValue={openFileContents}
          onChange={({ value }) => {
            write({ value })
          }}
          components={{}}
        />
      </Styled.root>
    )
  } else {
    return (
      <Layout>
        <Styled.root
          css={{
            maxWidth: '48em',
            padding: 32,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '40px'
          }}
        >
          <Styled.ul>
            <Styled.li
              sx={{
                my: 3
              }}
            >
              <Styled.a
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  handleParentDirectorySelection()
                }}
              >
                <Folder />
                <span sx={{ ml: 2 }}>..</span>
              </Styled.a>
            </Styled.li>
            {files.map(file => (
              <Styled.li
                key={file.pathname}
                sx={{
                  my: 3
                }}
              >
                <Styled.a
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    handleFileListSelection(file)
                  }}
                >
                    {file.isDirectory ? <Folder /> : <FileText />}
                    <span sx={{ ml: 2 }}>{file.pathname}</span>
                </Styled.a>
              </Styled.li>
            ))}
          </Styled.ul>
        </Styled.root>
      </Layout>
    )
  }
}

render(<App />, app)
